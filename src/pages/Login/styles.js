import { StyleSheet } from 'react-native';

const ROXO = '#9932cc';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 48,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ROXO,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  botaoLogin: {
    backgroundColor: ROXO,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 32,
  },
  botaoLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkCadastro: {
    marginTop: 24,
    fontSize: 14,
    color: '#888',
  },
  linkCadastroDestaque: {
    color: ROXO,
    fontWeight: 'bold',
  },
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