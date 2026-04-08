import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ROXO_VIBRANTE = '#9932cc';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // --- HEADER CENTRALIZADO ---
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

  // --- CARD DE EXIBIÇÃO SUPERIOR ---
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#FBF8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
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

  // --- TEXTOS E GRIDS ---
  welcomeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#555',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  flatListContainer: {
    paddingHorizontal: 15,
  },
  rowGrid: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    width: (width / 3) - 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bloodItemText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },

  // --- NOVO BOTÃO VOLTAR (ESTILO ROXO 85%) ---
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  buttonVoltar: {
    backgroundColor: ROXO_VIBRANTE,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});