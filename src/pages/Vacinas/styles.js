import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ROXO_VIBRANTE = '#9932cc';
const VERDE_SUCESSO = '#22C55E';
const BRANCO = '#FFFFFF';
const CINZA_CLARO = '#F0F0F0';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRANCO,
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

  // --- TEXTOS DE ORIENTAÇÃO ---
  welcomeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
    letterSpacing: 1,
    textAlign: 'center',
  },

  // --- GRID DE CARDS (PADRÃO 80x80) ---
  flatListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  rowGrid: {
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  actionButton: {
    alignItems: 'center',
    width: 100, // Espaço para o card + texto embaixo
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
  },

  // --- ESTILOS DO MODAL DE VACINAS ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Fundo escurecido
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: BRANCO,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
    marginBottom: 15,
    textAlign: 'center',
  },
  vacinaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: CINZA_CLARO,
    width: '100%',
  },
  vacinaText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },

  // --- BOTÃO VOLTAR (ROXO 85% SUBIDO) ---
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 40, // Botão mais alto em relação à base
  },
  buttonVoltar: {
    backgroundColor: ROXO_VIBRANTE,
    paddingVertical: 16,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
    buttonFechar: {
    backgroundColor: VERDE_SUCESSO,
    paddingVertical: 16,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    },
  buttonText: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // --- EXCLUSIVOS PARA TELA SANGUE (REUTILIZÁVEIS) ---
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#FBF8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CINZA_CLARO,
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
  bloodItemText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },
});