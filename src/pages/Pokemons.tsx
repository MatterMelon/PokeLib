import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonInfo } from "../types/PokemonTypes";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import CardList from "../components/ui/CardList/CardList";
import Button from "../components/ui/Button/Button";
import PokemonMockCard from "../components/PokemonCard/PokemonMockCard";
import PokemonService from "../API/PokemonService";
import React, { useEffect, useRef } from "react";

function PokemonCardList() {
  const queryLimit = 24;
  const lastElement = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: ({ pageParam = 0 }) =>
        PokemonService.fetchPokemonsInfoPaginated(pageParam, queryLimit),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.next,
    });

  useEffect(() => {
    if (!lastElement.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // Срабатывает, когда последний элемент полностью видим
    );

    observer.observe(lastElement.current);

    return () => {
      if (lastElement.current) {
        observer.unobserve(lastElement.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <CardList>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((pokemonInfo: PokemonInfo, index: number) => (
              <PokemonCard key={pokemonInfo.name} pokemonInfo={pokemonInfo} />
            ))}
          </React.Fragment>
        ))}
        <div ref={lastElement}></div>
      </CardList>

      <div style={{ height: "1px" }}>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
}

export default PokemonCardList;
