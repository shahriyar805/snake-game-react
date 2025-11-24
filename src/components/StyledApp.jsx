function StyledApp({ children }) {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-start bg-gradient-to-br from-yellow-600 to-yellow-200 pt-10">
      {children}
    </div>
  );
}

export default StyledApp;
