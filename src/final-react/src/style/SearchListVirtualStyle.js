import React, {useCallback} from 'react';
import {List} from "react-virtualized";
import SearchCardStyle from "./SearchCardStyle";

const SearchListVirtualStyle = (props) => {
    const {searchlist, product, setProduct, open, handleClose} = props;
    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const result = searchlist[index];
            return (
                <SearchCardStyle result={result}
                                 style={style}
                                 thisProduct={result}
                                 product={product}
                                 setProduct={setProduct}
                                 handleClose={handleClose}
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
            style={{outline: "none", margin: "0 auto"}}
        />
    );
};

export default React.memo(SearchListVirtualStyle);
