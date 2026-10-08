import Button from './Button.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';

// A small pill that appears on a public page only for a signed-in admin, linking to the matching console section.
// Everyone else gets nothing — no placeholder, no hint that it exists.
export default function AdminShortcut({ to, children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <div className="admin-shortcut">
      <Button to={to} variant="secondary" size="sm" dot={false}>{children}</Button>
    </div>
  );
}
