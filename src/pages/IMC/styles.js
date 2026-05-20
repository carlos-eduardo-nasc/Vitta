import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ROXO_VIBRANTE = '#9932cc';
const BRANCO = '#FFFFFF';
const CINZA_CLARO = '#F0F0F0';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRANCO,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  Title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
    letterSpacing: 1,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#FBF8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CINZA_CLARO,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  welcomeTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  bloodLabelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
  },
  bloodValueText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
  },
  rowGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    alignItems: 'center',
    width: 100,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: BRANCO,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: CINZA_CLARO,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardValueText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 40, 
    width: '100%',
  },
  buttonVoltar: {
    backgroundColor: ROXO_VIBRANTE,
    paddingVertical: 16,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});