// Marks UI that exists in the design but has no real function/content yet.
// Every use is listed in docs/TBD_REGISTER.md — keep them in sync.
export default function Tbd({ children = 'TBD', title, onDark = false }) {
  return (
    <span className={`tbd${onDark ? ' tbd--on-dark' : ''}`} title={title}>
      {children}
    </span>
  );
}
