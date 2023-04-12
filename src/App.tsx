import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png"
import RestartIcon from "./svgs/restart.svg"
import { InfoItem } from "./components/InfoItem/InfoItem";
import { Button } from "./components/Button/Button";

const App = () => {

  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)


  useEffect(() => resetAndCreateGrid(), [])

  const resetAndCreateGrid = () => {

  }

  return (
    <div>
      <C.Container>
        <C.Info>

          <C.LogoLink href="">
            <img src={logoImage} width={200} alt="" />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label="Tempo" value="00:00"></InfoItem>
            <InfoItem label="Movimentos" value="0"></InfoItem>
          </C.InfoArea>

          <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        </C.Info>

        <C.GridArea>
          <C.Grid>

          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App
