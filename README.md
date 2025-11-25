# Onde Tem?

**Aplicativo de Mapeamento de Recursos Comunitários para São Bernardo do Campo**

Onde Tem? é uma plataforma interativa desenvolvida para facilitar o acesso da população de São Bernardo do Campo aos recursos públicos e comunitários disponíveis na cidade. O aplicativo centraliza informações sobre serviços de educação, cultura, saúde e assistência social em uma interface intuitiva e acessível.

## Sobre o Projeto

O projeto nasceu da necessidade de tornar mais visível e acessível a rede de serviços públicos e comunitários oferecidos em São Bernardo do Campo. Muitos munícipes desconhecem a localização e funcionamento de equipamentos importantes como UBS, CRAS, bibliotecas, centros culturais e escolas técnicas.

Com o **Onde Tem?**, os cidadãos podem:
- Localizar rapidamente serviços próximos à sua região
- Acessar informações completas sobre horários, endereços e contatos
- Filtrar recursos por categoria de interesse
- Visualizar os serviços em mapa interativo ou lista detalhada

## Funcionalidades

### Visualização Interativa
- **Mapa de Recursos**: Representação visual dos serviços com marcadores coloridos por categoria
- **Visualização em Lista**: Listagem completa com cards informativos de todos os recursos
- **Alternância Simples**: Botões de alternância entre visualização de mapa e lista

### Sistema de Filtros
- **Filtros por Categoria**: 
  - **Educação** - Escolas técnicas, cursos profissionalizantes
  - **Cultura** - Teatros, bibliotecas, centros culturais, parques
  - **Saúde** - UBS, CAPS, policlínicas
  - **Assistência Social** - CRAS, CREAS, centros de acolhimento

### Informações Completas
Cada recurso inclui:
- Nome do equipamento
- Endereço completo com bairro
- Horários de funcionamento
- Telefone para contato
- Descrição detalhada dos serviços oferecidos
- Localização geográfica (latitude/longitude)

## Design e Identidade Visual

O projeto utiliza uma paleta de cores cuidadosamente escolhida para representar a identidade visual de São Bernardo do Campo:

- **Vermelho Principal** (`#AE0C2E`) - Cor primária, usada para elementos de destaque
- **Verde Suave** (`#AFC2A3`) - Utilizada para categoria Saúde
- **Amarelo Claro** (`#F6EEC3`) - Utilizada para categoria Educação
- **Bege** (`#C7B299`) - Utilizada para categoria Assistência Social
- **Marrom Escuro** (`#33211C`) - Cor secundária para textos e elementos de interface

### Princípios de Design
- **Acessibilidade**: Interface pensada para ser inclusiva e fácil de usar
- **Responsividade**: Funciona perfeitamente em dispositivos móveis, tablets e desktops
- **Usabilidade**: Navegação intuitiva e informações organizadas de forma clara

## Tecnologias Utilizadas

O Onde Tem? foi desenvolvido utilizando tecnologias modernas de desenvolvimento web:

- **React** - Biblioteca JavaScript para construção da interface
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first para estilização
- **Lucide React** - Biblioteca de ícones
- **Vite** - Build tool e servidor de desenvolvimento

## Estrutura de Dados

Os recursos comunitários estão organizados em uma estrutura de dados tipada:

```typescript
interface Resource {
  id: string;
  name: string;
  category: 'educacao' | 'cultura' | 'saude' | 'assistencia';
  address: string;
  neighborhood: string;
  schedule: string;
  contact: string;
  description: string;
  lat: number;
  lng: number;
}
```

