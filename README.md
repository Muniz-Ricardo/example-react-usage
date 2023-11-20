## Desenvolvimento híbrido em REACT NATIVE

Primeiro, é importante ter em mente que a escolha de um framework ou uma linguagem dependem de:
- Estágio do projeto (se ele está no inicio, mais a frente de desenvolvimento e entrega)
- Plano de entrega
- Dead Line (tempo até sua conclusão)
- Plataformas de lançamento

Tendo em vista esses pontos vamos falar sobre um FRAMEWORK baseado no JavaScript que é o REACT NATIVE, e como tecnologia ele contempla no modo base as plataformas ANDROID e IOS, individualmente essas plataformas
possuem suas próprias linguagens sendo mais comum para ANDROID o Kotlin/java e no IOS o Swift então oque o REACT NATIVE faz é transformar o JavaScript em componentes e códigos nativos, o princípio é de
Bridge (ponte) o código do padrão JavaScript cria uma comunicação com o compilador real nativo que então gera a aplicação NATIVA.

### Principais vantagens:

1 - Reutilização de componentes
> Nas plataformas Nativas a construção de componentes reutilizaveis como Botões (Button's), Carregamentos (Loading's) e outros componentes visuais são mais complexos de lidar até porque customizar cada componente
> exige um entendimento sobre a estrutura da construção base do component como no padrão SwiftUI (IOS) e nos tipos VIEW/GROUP (ANDROID), já no REACT NATIVE é muito similar ao padrão WEB conhecido como CSS de estilização
> oque facilita criar um component como um arquivo executável em JavaScript que pode ser chamado pelos arquivos de execução principal.

No exemplo abaixo temos um arquivo de nome `Button.js` que fica dentro de `components/atomic` que mantem o código para os seus estados, chamadas para ações (callback's) e seu estilo, então basta exportar
esse component para que seja visto pelo resto do escopo do projeto e utilizamos ele na visualização principal e isso vale para outros componentes que podem ser criados e apenas invocados na camada de visualização.

exemplo `Button.js`:

```javascript
import { React } from react;
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from react-native;

const Button = ({
  style,
  title,
  iconLeft,
  iconRight,
  onPress,
  onLongPress,
  textStyle,
  disabled,
  activeOpacity,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[disabled ? styles.disabledButton : styles.button, style]}
    >
      {iconLeft}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#42a5f5',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    disabledButton: {
      backgroundColor: 'grey',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });

  export default Button;
  
```

Chamando o Botão na tela principal `App.js`:

```javascript
// Component reusable (reutilizável)
import { Button } from './components/Button.js';

export default function App() {
  return (
    <View style={style.container}>
      <Button
        onPress={() => {
          // press event
        }}
        onLongPress={() => {
          // long press event
        }}
        title="Button"
        iconLeft={}
        iconRight={}
        style={styles.customButton}
        textStyle={styles.customButtonText}
      />
    </View>
  );
}

```

2 - Manutenção (mais rápida e unificada)
> Construir uma aplicação onde o core visa entregar para ambas as plataformas MOBILE é importante ter em vista que mesmo o NATIVO sendo consistente, podendo ser mais customizado e otimizado eles não
> entregam o mesmo nível de manutencionabilidade que uma aplicação HÍBRIDA que uma base de código é responsável pelo projeto inteiro. O modelo Bare Workflow é o template de implementação com REACT NATIVE
> que nos permite editar mais especificamente os módulos de cada plataforma (em alguns casos pode ser necessário) e por estarem no mesmo projeto e dividirem a mesma base de código ficaria na maior parte dos casos mais simples.

3 - Velocidade de implementação
- Código Base Única (Cross-Platform):

Uma das principais vantagens do React Native é a capacidade de usar uma única base de código para criar aplicativos para iOS e Android. Isso reduz a duplicidade de esforços.
- Reutilização de Componentes:

Facilita a reutilização de componentes de interface do usuário. Os componentes podem ser desenvolvidos e testados uma vez e, em seguida, reutilizados em diferentes partes do aplicativos.
- Hot Reloading:

A funcionalidade de Hot Reloading no React Native permite que os desenvolvedores vejam as alterações no código refletidas instantaneamente no aplicativo em execução, sem a necessidade de reiniciar o aplicativo.

### Principais desvantagens:

1 - Vinculos com bibliotecas de terceiros
> Assim como a maior parte dos frameworks exige que por meio do gerenciamento de pacotes/dependências você acabe precisando de certas funcionalidades que não se consegue facilmente no REACT NATIVE (Implementações de terceiros).
> No exemplo abaixo imagine duas bibliotecas a B e C, ambas dependem de uma biblioteca em comum mas cada uma delas precisa de uma versão ESPECÍFICA dessa biblioteca.

exemplo `package.json`:

```javascript
dependencies: {
  "libB": "v1.1.0",
  "libC": "v2.0.0"
}
```
Oque obtemos nesse caso é um típico CONFLITO entre dependências pois cada parte precisa de uma versão mas estamos chamando a mesma dependência com versões diferentes na base do projeto,
existem maneiras mais complicadas mas que evitam esses tipos de problemas mas acaba sendo uma desvantagem lidar com excesso de libs (bibliotecas) no REACT NATIVE.

2 - Fidelidade entre padrões de design
> Ambas as plataformas tanto o IOS quanto o ANDROID possuem seus mecanismos para lidarem com interfaces, um exemplo disso é a utilização do DP (densidade por pixel) no ANDROID que pode variar conforme tamanhos e tipos de cores que o device suportaria
> então se caso construíssemos um componente customizado que possue cores e bordas e essas cores se traduzem de uma forma no IOS e já no ANDROID não fiquem da mesma forma precisamos então
> criar uma CONDIÇÃO que muda essas características conforme a plataforma e isso pode ser cada vez mais atencional de se lidar já que pode escalar muito sempre criar uma condição para simples detalhes
> de design.

exemplo `Button.jsx`:

```javascript
const Button = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Button;
```

Para corrigir então teriamos que usar um condição (no caso uma condição ternaria):

```javascript
const Button = ({ onPress, title }) => (
 // condição ->
 <TouchableOpacity style={[styles.button, { borderColor: Platform.OS === 'ios' ? 'blue' : 'green' }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);
```
## Conclusão

RACT NATIVE hoje apesar de suas dependências e conflitos com tecnologias focadas em cada plataforma é o framework mantido pelo Facebook com uma comunidade forte que ajuda a melhorar esses problemas
não apenas tecnicamente mas pensando no Business para como tecnlogia principal de um projeto é um dos melhores recursos para facilitar, agilizar e criar projetos para ambas as plataformas com menos percauços 
que com soluções que necessitem criar do zero projetos para cada uma das plataformas individualmente.

Um dado importante é que desde 2015 ela caminhou até hoje no Brasil ser a mais utilizada no quesito desenvolvimento Mobile Híbrido.
Utilizo em provas de conceito ou quando o projeto precisa tomar mais tração des de o início para lançar em multiplas plataformas não apenas no Mobile mas na WEB também.
