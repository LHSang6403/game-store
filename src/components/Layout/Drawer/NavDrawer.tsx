import BottomDrawer from "@components/Layout/Drawer/BottomDrawer";

export default function NavDrawer() {
  return (
    <div className="center fixed bottom-0 left-0 z-20 h-12 w-full bg-foreground text-background xl:hidden">
      <BottomDrawer />
    </div>
  );
}
