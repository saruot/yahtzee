import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#b3b3ff',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#b3b3ff',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'merriweather-regular',
  },
  author: {
    color: '#fff',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'merriweather-regular',
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'merriweather-regular',
  },
  row: {
    marginTop: 20,
    padding: 10,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#b3b3ff",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    fontFamily: 'merriweather-regular'
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreButton: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'merriweather-regular',
  },
  shiftedRight: {
    marginLeft: 5,
    justifyContent: 'space-evenly',
  },
  gametext: {
    fontFamily: 'merriweather-regular',
  },
  player: {
    fontFamily: 'merriweather-regular',
    marginTop: 25,
  },
  totalpoints: {
    marginBottom: 15,
    fontFamily: 'merriweather-regular',
  },
  throwtext: {
    fontFamily: 'merriweather-regular',
    marginBottom: 20,
  },
});
