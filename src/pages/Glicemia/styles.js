import { StyleSheet } from 'react-native';

const ROXO_VIBRANTE = '#9932cc';
const VERDE_SUCESSO = '#22C55E';
const BRANCO = '#FFFFFF';
const CINZA_CLARO = '#F0F0F0';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BRANCO },

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

  welcomeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
    letterSpacing: 1,
    textAlign: 'center',
  },

  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FBF8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CINZA_CLARO,
  },
  welcomeTextContainer: { flex: 1, marginLeft: 15 },
  bloodLabelText: { fontSize: 12, fontWeight: '700', color: '#888' },
  bloodValueText: { fontSize: 28, fontWeight: 'bold', color: ROXO_VIBRANTE },
  statusLinha: { marginTop: 4, color: '#666', fontWeight: '600' },

  flatListContainer: { paddingHorizontal: 20, paddingBottom: 10 },
  rowGrid: { justifyContent: 'space-around', marginBottom: 18 },
  actionButton: { alignItems: 'center', width: 110 },
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

  // Link "Visualizar Histórico" (igual Água)
  linkWrap: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  linkText: { color: '#555', fontWeight: '600' },
  linkDestaque: { color: ROXO_VIBRANTE, fontWeight: '900', textDecorationLine: 'underline' },

  // Modal base
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    width: '85%',
    maxHeight: '75%',
    backgroundColor: BRANCO,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalContentHistorico: {
    width: '85%',
    maxHeight: '75%',
    backgroundColor: BRANCO,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
    marginBottom: 12,
    textAlign: 'center',
  },

  label: { fontSize: 14, fontWeight: '700', color: '#555', marginTop: 10, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: CINZA_CLARO,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },

  // Botões
  buttonSalvar: {
    backgroundColor: VERDE_SUCESSO,
    paddingVertical: 16,
    borderRadius: 12,
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
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonCancel: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextCancel: {
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  buttonText: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // Histórico cards
  registroCard: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CINZA_CLARO,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
  },
  registroTop: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  registroValor: { fontSize: 18, fontWeight: '900', color: '#111827' },
  registroSub: { marginTop: 4, color: '#6B7280', fontWeight: '600' },
  registroObs: { marginTop: 10, color: '#374151', fontWeight: '600' },
  excluirText: { marginTop: 10, color: '#EF4444', fontWeight: '800' },
  emptyText: { color: '#6B7280', fontWeight: '700' },

  // Botão voltar fixo
  buttonContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginBottom: 40 },
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
});