import { StyleSheet } from 'react-native';

const ROXO_VIBRANTE = '#9932cc';
const BRANCO = '#FFFFFF';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRANCO,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
    letterSpacing: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  fotoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoPlaceholderText: {
    marginTop: 10,
    color: '#9CA3AF',
    fontSize: 14,
  },
  fotoBotoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  fotoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  fotoBotaoTexto: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  horarioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
  },
  horarioTexto: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  botaoSalvar: {
    backgroundColor: ROXO_VIBRANTE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoSalvarTexto: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonVoltar: {
    backgroundColor: '#6B7280',
    paddingVertical: 16,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // ✅ Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: BRANCO,
    borderRadius: 20,
    padding: 25,
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalFoto: {
    width: 150,
    height: 150,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  modalInfo: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 12,
  },
  modalValor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBotao: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalBotaoCancelar: {
    backgroundColor: '#6B7280',
  },
  modalBotaoConfirmar: {
    backgroundColor: ROXO_VIBRANTE,
  },
  modalBotaoTexto: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sublabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    fontStyle: 'italic',
  },
});