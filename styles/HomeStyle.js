import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    baseContainer:{
        flex: 1,
        backgroundColor: "#fff",
    },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#b3b3ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  rulesContainer: {
    marginTop: 20,
  },
  rulesText: {
    marginBottom: 10,
    alignSelf: "center",  
    textAlign: "center",
    margin: 5,
}, 
});

export default homeStyles;
