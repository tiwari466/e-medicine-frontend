export default function MainLayout({
  children
}) {
  return (
    <div
      style={{
        background:"#f5f7fb",
        minHeight:"100vh"
      }}
    >
      <div
        style={{
          maxWidth:"1450px",
          margin:"0 auto",
          padding:"24px"
        }}
      >
        {children}
      </div>
    </div>
  );
}