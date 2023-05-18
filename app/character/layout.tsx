export const metadata = {
  title: "Characters",
};
const characterLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-10 py-10">{children}</div>;
};

export default characterLayout;
