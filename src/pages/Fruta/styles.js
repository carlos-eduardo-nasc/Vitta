import { StyleSheet } from 'react-native';

const ROXO_VIBRANTE = '#9932cc';
const BRANCO = '#FFFFFF';
const CINZA_CLARO = '#F0F0F0';
const VERDE_SUCESSO = '#22C55E';

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
//   Title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: ROXO_VIBRANTE,
//     letterSpacing: 1,
//   },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  wikifrutastitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
  },
  statusLinha: {
    marginTop: 4,
    color: '#666',
    fontWeight: '600',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
    marginTop: 8,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: CINZA_CLARO,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },

  buttonBuscar: {
    backgroundColor: VERDE_SUCESSO,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  erro: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 14,
    fontWeight: '800',
    textAlign: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: BRANCO,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: CINZA_CLARO,
    marginTop: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  nome: {
    fontSize: 20,
    fontWeight: '900',
    color: ROXO_VIBRANTE,
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: CINZA_CLARO,
  },
  info: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '700',
  },
  infoValor: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '800',
  },

  // Botão voltar fixo (igual padrão)
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 40,
    backgroundColor: 'transparent',
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

  buttonText: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});