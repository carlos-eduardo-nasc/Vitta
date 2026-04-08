import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 50, 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9932cc',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textOverlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#9932cc',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  inputSection: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },
  input: {
    width: '85%',
    height: 45,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F9FAFB',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,

  },
  // Botão genérico para os Modais
  button: {
    backgroundColor: '#9932cc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Botão de Registrar (Verde)
  buttonReg: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  // Botão de Voltar (Verde ou Roxo, conforme sua preferência)
  buttonVoltar: {
    backgroundColor: '#9932cc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#9932cc',
  },

  // --- ESTILO DO LINK "VISUALIZAR HISTÓRICO" ---
  historicoButton: {
    marginVertical: 10,
  },
  historicoText: {
    fontSize: 16,
    color: '#4B5563',
  },
  historicoLink: {
    color: '#9932cc',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  // --- ESTILOS DO MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
  },

  // --- ESTILOS DOS ITENS DO HISTÓRICO ---
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    width: '100%',
  },
  historyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  historyTime: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});