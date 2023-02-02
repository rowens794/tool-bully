import SideBar from "../../admin-components/sidebar";

export default function Example() {
  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <SideBar />
        </div>
      </div>
    </>
  );
}
