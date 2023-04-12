import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png"
import RestartIcon from "./svgs/restart.svg"
import { InfoItem } from "./components/InfoItem/InfoItem";
import { Button } from "./components/Button/Button";
import { GridItem } from "./components/GridItem/GridItem";
import { GridItemType } from "./types/GridItemTypes";
import { items } from "./data/items";

const App = () => {

  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(), [])

  const resetAndCreateGrid = () => {
    // RESETAR O JOGO
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)
    setGridItems([])

    // CRIAR O GRID
    let tmpGrid: GridItemType[] = []
    for(let i = 0; (items.length * 2); i++) tmpGrid.push({ item: null, shown: false, permanentShown: false })
    
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++) {
        let pos = -1
        while(pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
      tmpGrid[pos].item = i
      }
    }
    setGridItems(tmpGrid)
    setPlaying(true)
  }

  const handleItemClick = (index: number) => {
    
  }

  return (
    <div>
      <C.Container>
        <C.Info>

          <C.LogoLink href="">
            <img src={logoImage} width={200} alt="Logo" />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label="Tempo" value="00:00"></InfoItem>
            <InfoItem label="Movimentos" value="0"></InfoItem>
          </C.InfoArea>

          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        </C.Info>

        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App
