[x]cards 9x9
[x]bouton en savoir plus qui disparait quand 27 cards
[x]logo des plateformes
[x]barre de recherche
[x]pagedetail A PEU PRES
- afficher un store cliquable (BUY)
- genre / tag / plateforme cliquables et lancent un nouveau fetch avec request adaptée (genre/tag/plateforme)
[x]menu déroulant pour sélection de plateformes
[ ]hover de la card déclenche flip avec infos :
- date de sortie
- éditeur
- le(s) genre(s) du jeu
- note
- nombre de votes
[] css
- marges
- au moins 2 mixins
- les couleurs, tailles de marges, typos, tailles de typos et tailles récurrentes doivent être des variables
- responsivité (mixin mobile)
[] effet obligatoire : les liens internes doivent être soulignés au hover en suivant le premier exemple de ce Codepen.https://codepen.io/mburnette/pen/YXPggg



///// à garder sous le coude pour le toggle

  // //test pour trouver la donnée
    // let findPlatforms = articles.map(article => article.platforms);
    // console.log(findPlatforms)

    // let secondStep =  findPlatforms.map(platforms => {
    //   return platforms.map(platform => platform.platform.slug)
    // })
    // console.log(secondStep)
