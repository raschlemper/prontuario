'use strict';

app.constant('LISTS', {

  "educationLevels": [{ id: 0, label: '1º grau incompleto' }, 
                      { id: 1, label: '1º grau completo' }, 
                      { id: 2, label: '2º grau incompleto' }, 
                      { id: 3, label: '2º grau completo' }, 
                      { id: 4, label: '3º grau incompleto' }, 
                      { id: 5, label: '3º grau completo' }],

  "genders": [{ id: 0, label: 'Masculino' }, 
              { id: 1, label: 'Feminino' }],

  "letters": ['A','B','C','D','E','F','G','H','I','J','K','L','M',
              'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],

  "maritalStatus": [{ id: 0, label: 'Solteiro(a)' }, 
                    { id: 1, label: 'Cadsado(a)' }, 
                    { id: 2, label: 'Divorciado(a)' }, 
                    { id: 3, label: 'Viúvo(a)' }]

});
