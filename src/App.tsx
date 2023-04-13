import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png"
import RestartIcon from "./svgs/restart.svg"
import { InfoItem } from "./components/InfoItem/InfoItem";
import { Button } from "./components/Button/Button";
import { GridItem } from "./components/GridItem/GridItem";
import { GridItemType } from "./types/GridItemTypes";
import { items } from "./data/items";
import { formatTimerElapsed } from "./helpers/formatTimerElapsed";

const App = () => {

  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) setTimeElapsed(timeElapsed + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if(showCount === 2) {
      let opended = gridItems.filter(item => item.shown === true)
      if(opended.length === 2) {
        if(opended[0].item === opended[1].item ) {
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShowCount(0)
        } else {
            setTimeout(() => {
              let tmpGrid = [...gridItems]
            for(let i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGridItems(tmpGrid)
            setShowCount(0)
            }, 1000);
            setMoveCount(moveCount => moveCount + 1)
        }
      }
    }
  }, [showCount, gridItems])

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false)
    }
  }, [moveCount, gridItems])

  const resetAndCreateGrid = () => {
    // RESETAR O JOGO
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)
    

    // CRIAR O GRID
    let tmpGrid: GridItemType[] = []
    for(let i = 0; i < (items.length * 2); i++)  tmpGrid.push({
      item: null, shown: false, permanentShown: false
    })

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
    if(playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems]
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true
        setShowCount(showCount + 1)
      }
      setGridItems(tmpGrid)
    }
  }

  return (
    <div>
      <C.Container>
        <C.Info>

          <C.LogoLink href="">
            <img src={logoImage} width={200} alt="Logo" />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label="Tempo" value={formatTimerElapsed(timeElapsed)}></InfoItem>
            <InfoItem label="Movimentos" value={moveCount.toLocaleString()}></InfoItem>
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
