import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ROXO_VIBRANTE = '#9932cc';
const CINZA_CARD = '#E5E7EB'; // Cinza claro para os fundos dos cards

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row', // Título e ícones na mesma linha
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  vittaTitle: {
    fontWeight: 'bold',
    color: ROXO_VIBRANTE,
    letterSpacing: 1,
    fontSize: 25,
    marginBottom: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // --- NOVO CARD DE SAUDAÇÃO ---
  welcomeCard: {
    flexDirection: 'row', // Foto e texto lado a lado
    backgroundColor: CINZA_CARD, // Fundo cinza conforme modelo
    borderRadius: 25, // Bordas bem arredondadas
    padding: 20,
    marginHorizontal: 20, // Margem nas laterais
    marginBottom: 35, // Espaço para o grid abaixo
    alignItems: 'center',
    // Sombra profunda para destacar o card
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30, // Círculo perfeito
    backgroundColor: ROXO_VIBRANTE, // Roxo simulando a foto
    marginRight: 15, // Espaço entre foto e texto
  },
  welcomeTextContainer: {
    flex: 1, // Ocupa o restante do espaço
    justifyContent: 'center',
  },
  welcomeTextGreeting: {
    fontSize: 18,
    fontWeight: '700', // Negrito
    color: '#1F2937', // Preto/Cinza escuro
    marginBottom: 2,
  },
  welcomeTextName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280', // Cinza mais claro
  },
  // --- FIM DO NOVO CARD ---
  flatListContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  rowGrid: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    width: (width / 3) - 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // --- ATUALIZAÇÃO DOS BOTÕES DO MENU ---
  iconCircle: {
    width: 95, 
    height: 95,
    borderRadius: 22, // Bordas quadradas arredondadas (conforme o novo modelo)
    backgroundColor: CINZA_CARD, // Fundo cinza para os botões também
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB', // Borda sutil
    marginBottom: 8,
    // Sombra forte para os botões
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937', // Texto preto/cinza escuro
    textAlign: 'center',
    textTransform: 'uppercase', // Maiúsculas como no modelo
    marginTop: 2,
  },
});