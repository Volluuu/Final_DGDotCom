import React, {useCallback} from 'react';
import SearchCard from "./SearchCard";
import {List} from "react-virtualized";

const SearchListVirtual = ({searchlist}) => {

    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const result = searchlist[index];
            return (
                <SearchCard result={result}
                            key={key}
                            style={style}
                            product={result}
                />
            )
        },
        [searchlist],
    );
    return (
        <List
            width={432.33}
            height={800}
            rowCount={searchlist.length}
            rowHeight={100}
            rowRenderer={rowRenderer}
            list={searchlist}
            style={{outline:"none", margin:"0 auto"}}
        />
    );
};

export default React.memo(SearchListVirtual);
