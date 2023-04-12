import { GridItemType } from "../../types/GridItemTypes";
import * as C from "./style";
import b7Svg from "../../svgs/b7.svg"
import { items } from "../../data/items";

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container onClick={onClick}>
            {!item.permanentShown && !item.shown && <C.Icon src={b7Svg} />}
            {(item.permanentShown || item.shown) && item.item !== null && <C.Icon src={items[item.item].icon} />}
        </C.Container>
    )
}