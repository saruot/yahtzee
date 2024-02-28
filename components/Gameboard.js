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

    const [ dicePointsTotal, setdicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

    useEffect(() => {
        if (playerName === "" && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    const dicesRow = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        dicesRow.push(
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
        );
      }

      const renderScores = (scores) => {
        return scores.map((score, index) => (
            <Pressable
                key={index}
                onPress={() => updateScore(index)}
                style={[styles.scoreButton, selectedDicePoints[index] && styles.selectedScoreButton]}>
                <Text style={styles.scoreText}>{score}</Text>
            </Pressable>
        ));
    };
     
    
    const calculateScores = () => {
        const scores = [];
        for (let i = 1; i <= MAX_SPOT; i++) {
            if (!selectedDicePoints[i - 1]) {
                const score = diceSpots.reduce((acc, spot) => {
                    if (spot === i) {
                        return acc + spot;
                    }
                    return acc;
                }, 0);
                scores.push(score);
            } else {
                scores.push(0); // If category already selected, score is 0
            }
        }
        return scores;
    };
    
    const updateScore = (index) => {
        const scores = calculateScores();
        const newSelectedDicePoints = [...selectedDicePoints];
        newSelectedDicePoints[index] = true;
        setdicePointsTotal(dicePointsTotal + scores[index]);
        setSelectedDicePoints(newSelectedDicePoints);
    };

    

    function getDiceColor(i) {
            return selectedDices[i] ? "black" : "steelblue";
    }

    const selectedDice = (i) => {
        if (nbrOfThrows < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
            setStatus('');
        }
        else {
            setStatus("You have to throw dices first.")
        }

    }

    const throwDices = () => {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = "dice-" + randomNumber;
            }
        }
        setNbrOfThrows(nbrOfThrows-1);
    }

    return (
        <>
            <Header />
            <View>
                <Text>Gameboard</Text>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.gameinfo}>{status}</Text>
                <Pressable style={styles.button}
                    onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
          <View> {renderScores()}</View>
                </Pressable>
                <Text>Player: {playerName}</Text>
            </View>
            <Footer />
        </>
    )
}