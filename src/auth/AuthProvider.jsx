import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { backendEnabled, getClient } from '../lib/backend.js';
import LoginDialog from '../components/LoginDialog.jsx';

// Who is signed in, and whether they are an admin. Admin = a row in public.admins (written by hand in the SQL
// editor, never from the browser). Everything an admin sees is gated on `isAdmin`; the database enforces it too.
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

async function checkAdmin(sb, user) {
  if (!user) return false;
  const { data } = await sb.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  return Boolean(data);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(!backendEnabled); // false only while a stored session is being restored
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!backendEnabled) return undefined;
    let live = true;
    let subscription;

    const apply = async (sb, session) => {
      const next = session?.user ?? null;
      const admin = await checkAdmin(sb, next).catch(() => false);
      if (!live) return;
      setUser(next);
      setIsAdmin(admin);
      setReady(true);
    };

    getClient()
      .then(async (sb) => {
        if (!live || !sb) return;
        const { data } = await sb.auth.getSession();
        await apply(sb, data.session);
        // supabase-js deadlocks if this callback awaits another client call, so hand the work to the next tick
        ({ data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setTimeout(() => apply(sb, session), 0)));
      })
      .catch(() => live && setReady(true));

    return () => {
      live = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const sb = await getClient();
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return { error };
    const admin = await checkAdmin(sb, data.user);
    setUser(data.user);
    setIsAdmin(admin);
    return { error: null, isAdmin: admin };
  }, []);

  const signOut = useCallback(async () => {
    const sb = await getClient();
    await sb?.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({ enabled: backendEnabled, ready, user, isAdmin, signIn, signOut, openLogin: () => setLoginOpen(true) }),
    [ready, user, isAdmin, signIn, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {backendEnabled && <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />}
    </AuthContext.Provider>
  );
}
