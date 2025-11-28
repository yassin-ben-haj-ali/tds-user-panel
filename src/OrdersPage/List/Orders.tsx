import { useEffect, useRef } from "react";
import Loader from "@/components/ui/Loader/Loader";
import NoResults from "@/components/ui/NoResults";
import OrderCard from "./OrderCard";
import EmptyPage from "@/myArticles/emptyPage";
import { useInView } from "react-intersection-observer";
import useGetOrders from "../hooks/useGetOrders";
import type { Order } from "../context/types";
import AddOrder from "../AddOrder/AddOrder";

const Orders = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const getOrdersQuery = useGetOrders({
    filters: {
      orderBy: {
        key: "createdAt",
        value: "desc",
      },
    },
  });
  const statusFetch = getOrdersQuery?.status;

  useEffect(() => {
    if (
      inView &&
      getOrdersQuery.hasNextPage &&
      !getOrdersQuery.isFetchingNextPage
    ) {
      getOrdersQuery.fetchNextPage();
    }
  }, [inView, getOrdersQuery.hasNextPage, getOrdersQuery.isFetchingNextPage]);

  const ListOrders: Order[] =
    getOrdersQuery.data?.pages.flatMap((page) => page.paginatedResult) || [];

  if (statusFetch === "pending") {
    return (
      <Loader className="flex h-full w-full items-center justify-center" />
    );
  }

  if (statusFetch === "error") {
    return <EmptyPage name="article" component={<AddOrder />} />;
  }
  return ListOrders.length ? (
    <div ref={containerRef} className="h-full max-h-[400px] overflow-y-auto">
      {" "}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {ListOrders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
      <div ref={ref} className="h-10 w-full" />
      {getOrdersQuery.isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}
    </div>
  ) : (
    <NoResults />
  );
};

export default Orders;
