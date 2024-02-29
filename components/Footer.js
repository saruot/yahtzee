import React from "react";
import { Text, View } from "react-native";
import style from "../styles/style";
export default Header = () => {
    return (
        <View style={style.header}>
            <Text style={style.author}>
                Author: Samuli Ruotsalainen
            </Text>
        </View>
    )
}