import ServiceCatalog from "./ServiceCatalog";
import { getServiceCatalog } from "@/lib/service-content";

export default async function ManagedServiceCatalog({ compact = false }: { compact?: boolean }) {
  return <ServiceCatalog compact={compact} catalog={await getServiceCatalog()} />;
}
