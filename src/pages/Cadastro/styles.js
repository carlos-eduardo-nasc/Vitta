import { StyleSheet } from 'react-native';

const ROXO = '#9932cc';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 28, fontWeight: 'bold', color: ROXO, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 24, marginBottom: 12 },
  label: { fontSize: 14, color: '#555', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    padding: 12, fontSize: 15, backgroundColor: '#fafafa'
  },
  rowOpcoes: { flexDirection: 'row', marginTop: 4 },
  botaoOpcao: {
    flex: 1, padding: 12, borderRadius: 10, marginHorizontal: 4,
    borderWidth: 1, borderColor: '#ddd', alignItems: 'center'
  },
  botaoOpcaoAtivo: { backgroundColor: ROXO, borderColor: ROXO },
  textOpcao: { color: '#555', fontWeight: '600' },
  textOpcaoAtivo: { color: '#fff' },
  gridTipos: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  botaoTipo: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8,
    borderWidth: 1, borderColor: '#ddd', margin: 4
  },
  botaoTipoAtivo: { backgroundColor: ROXO, borderColor: ROXO },
  textTipo: { color: '#555', fontWeight: '600' },
  textTipoAtivo: { color: '#fff' },
  botaoCadastro: {
    backgroundColor: ROXO, padding: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 32
  },
  botaoCadastroText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9932cc',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalTexto: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalDestaque: {
    fontWeight: 'bold',
    color: '#9932cc',
    fontSize: 18,
  },
  modalBotao: {
    backgroundColor: '#9932cc',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

