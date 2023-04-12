import { GridItemType } from "../../types/GridItemTypes";
import * as C from "./style";

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container onClick={onClick}>
            ...
        </C.Container>
    )
}