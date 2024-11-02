import BottomDrawer from "@components/Layout/Drawer/BottomDrawer";

export default function NavDrawer() {
  return (
    <div className="fixed bottom-0 left-0 z-20 flex h-12 w-full items-center justify-center bg-foreground text-background xl:hidden">
      <BottomDrawer />
    </div>
  );
}
