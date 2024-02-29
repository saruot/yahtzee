import { useState } from "react";
import { Text, TextInput, View, Pressable, Keyboard } from "react-native";
import styles from "../styles/style"; // Import your global styles
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import homeStyles from "../styles/HomeStyle";

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <>
            <Header />
            <View style={homeStyles.baseContainer}>
                {!hasPlayerName ?
                    <>
                        <Text style={homeStyles.rulesText}>
                            For scoreboard enter your name:
                        </Text>
                        <View style={homeStyles.inputContainer}>
                            <TextInput style={homeStyles.input} onChangeText={setPlayerName} autoFocus={true} />
                        </View>
                        <Pressable style={homeStyles.button} onPress={() => handlePlayerName(playerName)}>
                            <Text style={homeStyles.buttonText}>OK</Text>
                        </Pressable>
                    </>
                    :
                    <>
                        <View style={homeStyles.rulesContainer}>
                            <Text style={homeStyles.rulesText}>Rules of the game:</Text>
                            <Text style={homeStyles.rulesText}>
                                THE GAME: Upper section of the classic Yahtzee
                                dice game. You have {NBR_OF_DICES} dices and
                                for every dice you have {NBR_OF_THROWS}{' '}
                                throws. After each throw, you can keep dices in
                                order to get the same dice spot counts as many as
                                possible. At the end of the turn, you must select
                                your points from {MIN_SPOT} to {MAX_SPOT}.
                                The game ends when all points have been selected.
                                The order for selecting those is free.
                            </Text>
                            <Text style={homeStyles.rulesText}>
                                POINTS: After each turn, the game calculates the sum
                                for the dices you selected. Only the dices having
                                the same spot count are calculated. Inside the
                                game, you cannot select the same points from{' '}
                                {MIN_SPOT} to {MAX_SPOT} again.
                            </Text>
                            <Text style={homeStyles.rulesText}>
                                GOAL: To get as many points as possible.{' '} 
                                {BONUS_POINTS_LIMIT} points is the limit of
                                getting a bonus which gives you {BONUS_POINTS}{' '}
                                points more.
                            </Text>
                            <Text style={homeStyles.rulesText}>Good luck, {playerName}</Text>
                        </View>
                        <Pressable style={homeStyles.button} onPress={() => navigation.navigate("Gameboard", { player: playerName })}>
                            <Text style={homeStyles.buttonText}>PLAY</Text>
                        </Pressable>
                    </>
                }
            </View>
            <Footer />
        </>
    )
}
