import { Country } from "@/components/CountyCard";
import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, type To } from "react-router-dom";

type Boarder = Pick<Country, "name" | "ccn3">;

const CountyBoarders: React.FC<{ borders: string | undefined }> = ({
  borders,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["COUNTY_BOARDS", borders],
    enabled: !!borders,
    queryFn: async ({ queryKey }) => {
      return fetch(
        `https://restcountries.com/v3.1/alpha?codes=${queryKey.at(1)}&fields=name,ccn3`,
      ).then((e) => e.json() as Promise<Boarder[]>);
    },
  });

  if (isLoading)
    return (
      <>
        <Skeleton className="inline-flex w-20 items-center rounded-md border px-2.5 py-0.5 dark:bg-gray-600" />
        <Skeleton className="inline-flex w-20 items-center rounded-md border px-2.5 py-0.5 dark:bg-gray-600" />
        <Skeleton className="inline-flex w-20 items-center rounded-md border px-2.5 py-0.5 dark:bg-gray-600" />
      </>
    );

  if (isError || !data) return;

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((value) => (
        <Link to={`/view/${value.ccn3}`} key={value.ccn3}>
          <Badge className="rounded-md bg-card" variant="outline">
            {value.name.common}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

const ViewCountry: React.FC = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["COUNTY", id],
    enabled: !!id,
    queryFn: async ({ queryKey }) => {
      const ccn3 = queryKey.at(1);
      if (!ccn3)
        throw new Error(`Failed to load county with ccn3 of '${ccn3}'`);

      const countuy = await fetch(
        `https://restcountries.com/v3.1/alpha/${ccn3}`,
      ).then((e) => e.json() as Promise<Country[]>);

      const data = countuy.at(0);
      if (!data) throw new Error("Failed to find county");

      return data;
    },
  });

  if (isError)
    return (
      <div className="flex h-full items-center justify-center">
        <ErrorComponent
          title="500"
          subHeading="Loading Error"
          errorMessage="Failed to load country"
        />
      </div>
    );

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center py-8">
        <Loading />
        <span className="ml-4 text-2xl font-medium">Loading</span>
      </div>
    );

  return (
    <div className="container flex h-full flex-col pb-6">
      <div className="flex h-36 flex-col items-start justify-center">
        <Button size="sm" className="shadow" variant="card" asChild>
          <Link to={-1 as To}>
            <ArrowLeft className="mr-1 h-6 w-6" /> Back
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 grid-rows-none gap-10 md:grid-cols-2 md:gap-20">
        <section className="flex">
          <div className="relative h-60 w-full md:h-96">
            <img
              className="h-full w-full object-cover"
              src={data?.flags.svg}
              alt={data?.flag}
            />
          </div>
        </section>
        <section className="flex flex-col justify-center">
          <div className="flex flex-col space-y-4 p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
              {data?.name.common}
            </h1>
            <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-0">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Native Name:</span>{" "}
                  <span className="text-muted-foreground">
                    {Object.values(data?.name.nativeName ?? {}).at(-1)?.common}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  <span className="text-muted-foreground">
                    {data?.population.toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  <span className="text-muted-foreground">{data?.region}</span>
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{" "}
                  <span className="text-muted-foreground">
                    {data?.subregion}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  <span className="text-muted-foreground">
                    {data?.capital?.at(0)}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  <span className="text-muted-foreground">{data?.tld}</span>
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span>{" "}
                  <span className="text-muted-foreground">
                    {Object.values(data?.currencies ?? {})
                      .map((value) => value.name)
                      .join(", ")}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Languaes:</span>{" "}
                  <span className="text-wrap text-muted-foreground">
                    {Object.values(data?.languages ?? {}).join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-10">
              <h3 className="mr-1 font-semibold">Boarder Countries:</h3>
              <CountyBoarders
                borders={data?.borders ? data?.borders.join(",") : undefined}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewCountry;
