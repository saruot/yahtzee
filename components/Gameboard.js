import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import Header from './Header';
import Footer from './Footer';
import styles from "../styles/style";
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons.js';

let board = [];

export default Gameboard = ({ navigation, route }) => {

    const [ playerName, setPlayerName ] = useState("");
    const [ nbrOfThrows, setNbrOfThrows ] = useState(NBR_OF_THROWS);
    const [ status, setStatus ] = useState("Throw dices");
    const [ gameEndStatus, setGameEndStatus ] = useState(false);
/* Are dices selected or not? */
    const [ selectedDices, setSelectedDices ] = useState(new Array(NBR_OF_DICES).fill(false));
/* Dice spots (1, 2, 3, 4, 5, 6) for each die */
    const [ diceSpots, setDiceSpots ] = useState(new Array(NBR_OF_DICES).fill(0));
/* Are dice points selected or not */
    const [ selectedDicePoints, setSelectedDicePoints ] = useState(new Array(MAX_SPOT).fill(false));

    const [ dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    useEffect(() => {
        if (playerName === "" && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);


//    useEffect(() => {
      
//  }, [NBR_OF_THROWS])
    


    const dicesRow = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        dicesRow.push(
            <Col key={'index' + i}>
          <Pressable 
              key={"row" + i}
              onPress={() => selectedDice(i)}>
            <MaterialCommunityIcons
              name={board[i]}
              key={"row" + i}
              size={50} 
              color={getDiceColor(i)}>
            </MaterialCommunityIcons>
          </Pressable>
          </Col>
        );
      }

      
    const pointsToSelectRow = []
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={'index' + diceButton}>
                <Pressable key={'index' + diceButton} 
                 onPress={() => selectDicePoints(diceButton)}
                >
                    <MaterialCommunityIcons name={"numeric-" + (diceButton+1) + "-circle"}
                    key={'index' + diceButton}
                    size={35}
                    color={getDicePointsColor(diceButton)}
                    >

                    </MaterialCommunityIcons>

                </Pressable>
            </Col>
        )
    }
     
    const pointsRow = []
    for (let i = 0; i < MAX_SPOT; i++) {
        pointsRow.push(
            <Col key={i}>
                <Text key={i}>
                    {getSpotTotal(i)}
                </Text>
            </Col>
        )
        
    }
    

    function getDiceColor(i) {
            return selectedDices[i] ? "black" : "steelblue";
    }

    function getDicePointsColor(i) {
        if (selectedDicePoints[i] && !gameEndStatus) {
            return "black"
        } else
        { return "steelblue"}
    }

    const selectedDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
            setStatus('');
        }
        else {
            setStatus("You have to throw dices first.")
        }

    }

    function getSpotTotal(i){
        return dicePointsTotal[i]
    }

    const throwDices = () => {
       if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('Select your points before the next throw')
            return 1;
        } /* else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false)
            diceSpots.fill(0)
            dicePointsTotal.fill(0)
        } */ 
        // osa 1
        let spots = [...diceSpots]
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1)
                board[i] = 'dice-' + randomNumber
                spots[i] = randomNumber
            }   
        }
       setNbrOfThrowsLeft(nbrOfThrowsLeft -1)
       setStatus('Select and throw dices again.') 
    }

    const selectDicePoints = (i) => {
        if (!gameEndStatus && nbrOfThrowsLeft === 0) {
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
        points[i] = nbrOfDices * (i+1)
        setDicePointsTotal(points);
        selectedDicePoints[i] = true;

        setSelectedDices([...selectedDices]);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(3);
        console.log(getSpotTotal(i))
        return points[i] 
    }
    }

    return (
        <>
            <Header />
            <View>
                <Text>Gameboard</Text>
                <Container fluid>
                    <Text>Throws left:{nbrOfThrowsLeft}</Text>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.gameinfo}>{status}</Text>
                <Pressable style={styles.button}
                    onPress={() => throwDices()}>
            <Text style={styles.buttonText}>
             Throw dices
            </Text>
                </Pressable>
        <Pressable>
                <Row>{pointsRow}</Row>
                <Row>{pointsToSelectRow}</Row>
                <Text>Player: {playerName}</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}