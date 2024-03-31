import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PageBreadcrumb({ pathname }: { pathname: string }) {
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={breadcrumb.link}>
                  {breadcrumb.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function generateBreadcrumbs(url: string) {
  const parts = url.split("/").filter((part) => part.trim() !== "");

  const breadcrumbs: { name: string; link: string }[] = [];

  let path = "";
  for (let i = 0; i < parts.length; i++) {
    path += "/" + parts[i];

    const name = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);

    breadcrumbs.push({
      name: name,
      link: path,
    });
  }

  return breadcrumbs;
}
