function shuffleWords(paragraph) {
  // Split the paragraph into words
  const words = paragraph.split(/\s+/);

  // Shuffle the words array using Fisher-Yates algorithm
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]]; // Swap elements
  }

  // Join the shuffled words back into a single string
  return words.join(" ");
}

// easy
// En una pequeña ciudad rodeada de montañas vivía una niña llamada Sofía. Todos los días, cuando el sol aparecía en el cielo, ella se levantaba de la cama y miraba por la ventana. Le gustaba observar cómo los pájaros volaban por el aire y cómo las flores en el jardín comenzaban a abrirse. Su casa estaba al final de una calle tranquila, donde siempre había niños jugando y vecinos caminando. Sofía tenía un perro llamado Toby, que siempre estaba a su lado. Juntos, salían a caminar todas las mañanas. Sofía llevaba una pelota en la mano, y Toby siempre saltaba de alegría cuando veía la pelota. Caminaban hasta el parque, donde se encontraban con otros niños y sus mascotas. Allí, jugaban durante horas. Sofía y sus amigos hacían carreras, lanzaban la pelota, y a veces organizaban pequeños partidos de fútbol. A Sofía le encantaba correr y sentir el viento en su cara. El parque tenía árboles grandes que daban sombra, así que cuando hacía mucho calor, se sentaban debajo de los árboles a descansar. Mientras descansaban, Sofía solía contar historias sobre aventuras que imaginaba. Soñaba con viajar por el mundo, conocer lugares nuevos y hacer amigos en cada lugar. Sus amigos siempre la escuchaban con atención, porque sus historias eran divertidas y llenas de imaginación. Después de jugar en el parque, Sofía regresaba a casa con Toby. Su mamá siempre la esperaba con una deliciosa comida. A Sofía le encantaban las pastas con salsa de tomate que su mamá cocinaba. Luego del almuerzo, Sofía hacía sus deberes escolares. Aunque a veces le parecían un poco aburridos, sabía que era importante estudiar para aprender cosas nuevas. Después de terminar su tarea, le gustaba leer libros de aventuras. Uno de sus libros favoritos era sobre una niña que viajaba en un barco por el océano y descubría islas misteriosas. Sofía imaginaba que algún día ella también tendría aventuras como las del libro. Por la tarde, salía al jardín para ayudar a su mamá a cuidar las flores. Había muchas flores de colores: rojas, amarillas, azules y moradas. A Sofía le gustaba regarlas con agua fresca y ver cómo crecían fuertes y bonitas. Algunas veces, incluso recogía flores para hacer ramos y decorar la mesa del comedor. Al caer la tarde, Sofía y su familia se reunían en la sala para ver una película o jugar a algún juego de mesa. Toby, su perro, siempre se sentaba cerca de Sofía, moviendo la cola de felicidad. Después de un día lleno de actividades, llegaba la hora de dormir. Sofía se cepillaba los dientes, se ponía su pijama favorita y se metía en la cama. Antes de cerrar los ojos, siempre pensaba en todo lo que había hecho durante el día y en las aventuras que tendría mañana. Así, poco a poco, se quedaba dormida, soñando con nuevos lugares por descubrir y nuevas historias que contar.
//
// Medium
//En una ciudad ubicada cerca del mar, vivía un joven llamado Martín. Él siempre había sido muy curioso y le encantaba aprender sobre el mundo que lo rodeaba. Desde pequeño, se había interesado por la ciencia y la naturaleza. Pasaba horas observando los pájaros en el parque o recogiendo conchas en la playa cercana. Su pasión por descubrir cosas nuevas lo llevó a leer muchos libros sobre biología, física y astronomía. Una de las cosas que más le fascinaba era el universo y sus misterios. Martín solía pasar noches enteras mirando las estrellas desde el balcón de su casa. Tenía un telescopio que le había regalado su abuelo, y con él podía ver los cráteres de la luna y, a veces, planetas lejanos como Júpiter o Saturno. Cada vez que lograba ver algo nuevo en el cielo, sentía una gran emoción. Un día, mientras caminaba por la playa, Martín encontró una botella con un mensaje dentro. El papel estaba algo mojado, pero aún se podía leer. Decía: "El conocimiento es como el océano, profundo y vasto. Nunca dejes de explorar." Ese mensaje lo inspiró aún más a seguir investigando y a nunca dejar de aprender. Decidió que quería estudiar ciencias en la universidad, para poder entender mejor cómo funcionaba el mundo. Se imaginaba trabajando en un laboratorio, descubriendo cosas importantes para mejorar la vida de las personas. Durante su último año de escuela, Martín se inscribió en un concurso de ciencia con un proyecto sobre la energía renovable. Había leído mucho sobre la importancia de cuidar el medio ambiente y quería aportar su granito de arena. Diseñó un modelo de turbina eólica que podría generar electricidad en zonas costeras. Pasó muchas semanas trabajando en su proyecto, haciendo cálculos y experimentando con diferentes materiales. Cuando llegó el día del concurso, presentó su proyecto frente a un grupo de jueces y otros estudiantes. Aunque estaba nervioso, sabía que había trabajado duro y confiaba en lo que había hecho. Al final, su esfuerzo fue recompensado, ya que ganó el primer premio. El éxito en el concurso no solo le dio confianza en sí mismo, sino que también lo motivó a seguir adelante con sus estudios. Sabía que la ciencia no solo era una forma de entender el mundo, sino también una herramienta para resolver los problemas que enfrentaba la humanidad. Con el tiempo, Martín logró ingresar a una prestigiosa universidad donde pudo seguir desarrollando sus ideas y trabajando en proyectos innovadores. Sin embargo, nunca olvidó el mensaje que había encontrado en aquella botella en la playa: "El conocimiento es como el océano." Sabía que aún había mucho por aprender y explorar, y esa idea lo mantenía siempre en movimiento.

// Hard
// En una antigua ciudad, cuyas calles estaban impregnadas de historia y misterio, vivía un joven llamado Alejandro. Desde temprana edad, había demostrado una capacidad innata para comprender temas complejos que otros de su misma edad solían encontrar tediosos o abrumadores. Su pasión por el conocimiento no conocía límites, y constantemente se sumergía en libros de filosofía, física teórica y literatura clásica. Para él, la vida era un enigma que debía resolverse a través de la exploración intelectual. Sin embargo, a pesar de su vasto conocimiento, Alejandro sentía que algo faltaba en su vida, como si la mera acumulación de datos y teorías no fuera suficiente para satisfacer su curiosidad innata. Un día, mientras caminaba por las estrechas y empedradas calles del centro histórico, Alejandro se encontró con una pequeña librería escondida entre dos edificios antiguos. Decidió entrar, atraído por el olor a papel envejecido y la promesa de descubrimientos inesperados. En el fondo de la tienda, en una estantería cubierta de polvo, encontró un libro antiguo y deteriorado que parecía haber sido olvidado por el tiempo. Al abrirlo, descubrió que no se trataba de un libro común. Sus páginas estaban llenas de símbolos y diagramas que nunca había visto, acompañados por textos en un idioma que no lograba reconocer del todo. Intrigado, decidió comprar el libro y dedicar tiempo a descifrar su contenido. Conforme avanzaban los días, Alejandro pasaba largas horas en su habitación, rodeado de diccionarios, mapas antiguos y cuadernos llenos de notas. Cuanto más intentaba comprender el significado del libro, más se daba cuenta de que no se trataba solo de un simple texto académico, sino de una obra que combinaba conocimiento científico, filosofía profunda y elementos místicos. A través de sus investigaciones, llegó a la conclusión de que el autor del libro había intentado describir una teoría unificada del universo, en la que la ciencia, la espiritualidad y el arte se entrelazaban de una manera que desafiaba las fronteras convencionales del pensamiento humano. A medida que Alejandro profundizaba en sus estudios, comenzó a cuestionar muchas de las ideas que hasta entonces había dado por sentadas. Comprendió que el conocimiento no era una meta en sí mismo, sino un medio para alcanzar una comprensión más profunda de la existencia. Empezó a considerar la posibilidad de que algunas preguntas, como el origen de la conciencia o la naturaleza del tiempo, no pudieran ser respondidas solo con la lógica y el razonamiento, sino que requerían una apertura a lo desconocido, a lo intuitivo y lo emocional. Finalmente, Alejandro llegó a una conclusión sorprendente: el libro no le proporcionaba todas las respuestas, pero le había enseñado una valiosa lección sobre la humildad intelectual. Entendió que el conocimiento verdadero no radica solo en acumular datos, sino en reconocer los límites de la propia comprensión y en aceptar que el misterio, en última instancia, es parte esencial de la vida.

// punctuation
// Ce matin, Léa se réveilla tôt; elle avait une journée chargée devant elle… Elle se leva, s’habilla rapidement, et prit son petit-déjeuner: une tasse de café, un croissant, et un jus d’orange. « Quelle belle journée ! », s’exclama-t-elle, en ouvrant la fenêtre. Le soleil brillait déjà haut dans le ciel. Pourtant, elle se sentait un peu nerveuse. Pourquoi ? Aujourd’hui, elle devait présenter un projet important au travail. « Allez, il faut y aller », pensa-t-elle. Léa attrapa son sac (dans lequel elle avait mis tous ses documents) et sortit de chez elle. En descendant les escaliers, elle croisa son voisin, Paul, qui lui dit: « Bonne chance pour aujourd'hui ! Tu vas réussir, j'en suis sûr. » Léa lui sourit et répondit: « Merci beaucoup ! » Une fois dans la rue, elle marcha rapidement vers la gare; elle devait prendre le train pour se rendre au bureau. Cependant, à mi-chemin, elle réalisa qu'elle avait oublié un dossier important… Que faire ? Elle n’avait pas le temps de revenir en arrière ! Heureusement, son collègue, Mathieu, l’appela à ce moment précis. « Léa ! J’ai vu que tu avais laissé un dossier sur ton bureau hier soir; je l’ai pris avec moi, ne t’inquiète pas. » Ouf, quel soulagement ! « Merci, Mathieu, tu me sauves la vie ! » Il lui répondit avec un sourire dans la voix: « Pas de problème, c’est normal. » En arrivant à la gare, elle réalisa qu'elle avait encore quelques minutes avant le départ du train. Elle s’assit sur un banc et prit un moment pour respirer. « Tout va bien se passer », se rassura-t-elle. Le train arriva à l'heure, et elle monta à bord. Pendant le trajet, Léa relut ses notes: elle voulait être sûre de ne rien oublier. Il y avait tant de détails à présenter ! Ses idées devaient être claires, précises, et bien organisées. Une fois au bureau, tout s'enchaîna rapidement. Ses collègues étaient déjà là, prêts à commencer la réunion. « On y va ? », demanda son chef avec un sourire. Léa hocha la tête et prit une grande inspiration. C’était le moment ! Elle commença sa présentation avec assurance. « Mesdames et messieurs, je vous présente aujourd’hui notre nouveau projet: une application innovante qui simplifiera la gestion de nos clients. » Elle parla de chaque fonctionnalité, du design de l’application, et des avantages pour l’entreprise. Tout le monde écoutait attentivement. À la fin de son discours, elle lança: « Des questions ? » Il y eut un moment de silence… Puis, des applaudissements éclatèrent dans la salle ! « Bravo, Léa ! », s’exclama son chef. « C’était vraiment impressionnant. » Soulagée, elle sourit et répondit: « Merci à vous tous ! » La journée se termina sur cette note positive. Léa rentra chez elle, satisfaite de son travail. Avant de s’endormir, elle pensa: « Quelle journée incroyable ! »
//
// Special Characters
// L’été dernier, j’ai voyagé à travers la France avec mon frère. Nous avons visité plusieurs villes magnifiques, comme Paris, Lyon, et même une petite ville près de la côte appelée Saint-Malo. L'expérience a été incroyable, et chaque jour, nous découvrions quelque chose de nouveau. À Paris, nous avons commencé par voir la célèbre tour Eiffel. « C’est tellement grand ! », s’est exclamé mon frère. Il avait raison : la tour est impressionnante. Nous avons pris l’ascenseur jusqu’au sommet, où la vue sur la ville était spectaculaire. On pouvait voir le Sacré-Cœur, l’Arc de Triomphe, et la Seine qui serpentait à travers la ville. Paris est vraiment la « Ville Lumière », et ce surnom lui va parfaitement. Ensuite, nous sommes allés au musée du Louvre pour admirer les œuvres d’art célèbres. Il y avait une foule immense devant la Joconde, ou Mona Lisa comme on l'appelle souvent. Son sourire mystérieux fascine toujours autant les visiteurs. Nous avons aussi vu des sculptures antiques, comme la Vénus de Milo, et d’autres trésors artistiques provenant de différentes époques. Après Paris, nous avons pris un train pour Lyon. Cette ville, célèbre pour sa gastronomie, nous a immédiatement conquis. Nous avons goûté à plusieurs spécialités locales, comme le boudin, la quenelle, et bien sûr, de délicieux plats à base de fromage. Les ruelles du Vieux Lyon sont étroites, mais pleines de charme avec leurs bâtiments historiques. En déambulant, nous avons découvert de petites boutiques artisanales où des produits locaux étaient vendus : du savon parfumé, des chocolats faits à la main, et même des objets en bois sculpté. L'une des choses que j’ai préférées à Lyon, c’était la montée jusqu’à la basilique de Fourvière. Le chemin était un peu difficile, mais une fois arrivés au sommet, la vue en valait la peine. Nous pouvions voir toute la ville s’étendre à nos pieds, avec le Rhône et la Saône qui se rejoignaient en bas. C’était un moment de tranquillité après plusieurs jours bien remplis. Enfin, notre dernier arrêt fut Saint-Malo, une ville côtière au charme unique. L’architecture des bâtiments et l’atmosphère maritime nous ont tout de suite plu. Nous avons marché le long des remparts qui entourent la vieille ville. « Regarde ces vagues ! », a dit mon frère, alors que l’océan Atlantique frappait les rochers avec force. Saint-Malo est aussi célèbre pour ses marées spectaculaires. À marée basse, nous avons pu marcher jusqu’à certaines petites îles voisines, mais il fallait faire attention à l’heure pour ne pas se retrouver piégés par la marée montante.
//
// numbers
//
const paragraph =
  "En una pequeña ciudad rodeada de montañas vivía una niña llamada Sofía. Todos los días, cuando el sol aparecía en el cielo, ella se levantaba de la cama y miraba por la ventana. Le gustaba observar cómo los pájaros volaban por el aire y cómo las flores en el jardín comenzaban a abrirse. Su casa estaba al final de una calle tranquila, donde siempre había niños jugando y vecinos caminando. Sofía tenía un perro llamado Toby, que siempre estaba a su lado. Juntos, salían a caminar todas las mañanas. Sofía llevaba una L’été1 dernier2, nous3 avons4 décidé5 de6 partir7 en8 voyage9 à10 travers11 la12 France13. Nous14 avons15 visité16 plusieurs17 villes18 intéressantes19 : Paris20, Lyon21, et22 Marseille23. Chaque24 jour25 était26 une27 nouvelle28 aventure29. À30 Paris31, nous32 avons33 commencé34 par35 voir36 la37 tour38 Eiffel39. C’était40 immense41 ! Nous42 avons43 pris44 l’ascenseur45 jusqu’au46 sommet47. La48 vue49 était50 magnifique51. On52 pouvait53 voir54 les55 monuments56 célèbres57 comme58 l’Arc59 de60 Triomphe61 et62 la63 Seine64. Ensuite65, nous66 avons67 visité68 le69 musée70 du71 Louvre72. Il73 y74 avait75 une76 foule77 immense78 devant79 la80 Joconde81. Son82 sourire83 mystérieux84 fascine85 toujours86 les87 visiteurs88. Nous89 avons90 aussi91 vu92 des93 sculptures94 antiques95 comme96 la97 Vénus98 de99 Milo100. À101 Lyon102, nous103 avons104 goûté105 à106 des107 spécialités108 locales109 comme110 le111 boudin112 et113 les114 quenelles115. Les116 ruelles117 du118 Vieux119 Lyon120 étaient121 charmantes122 Ce matin, Léa se réveilla tôt; elle avait une journée chargée devant elle… Elle se leva, s’habilla rapidement, et prit son petit-déjeuner: une tasse de café, un croissant, et un jus d’orange. « Quelle belle journée ! », s’exclama-t-elle, en ouvrant la fenêtre. Le soleil brillait déjà haut dans le ciel. Pourtant, elle se sentait un peu nerveuse. Pourquoi ? Aujourd’hui, elle devait présenter un projet important au travail. « Allez, il faut y aller », pensa-t-elle. Léa attrapa son sac (dans lequel elle avait mis Ce matin, Léa se réveilla tôt; elle avait une journée chargée devant elle… Elle se leva, s’habilla rapidement, et prit son petit-déjeuner: une tasse de café, un croissant, et un jus d’orange. « Quelle belle journée ! », s’exclama-t-elle, en ouvrant la fenêtre. Le soleil brillait déjà haut dans le ciel. Pourtant, elle se sentait un peu nerveuse. Pourquoi ? Aujourd’hui, elle devait présenter un projet important au travail. « Allez, il faut y aller », pensa-t-elle. Léa attrapa son sac (dans lequel elle avait mis tous ses documents) et sortit de chez elle. En descendant les escaliers, elle croisa son voisin, Paul, qui lui dit: « Bonne chance pour aujourd'hui ! Tu vas réussir, j'en suis sûr. » Léa lui sourit et répondit: « Merci beaucoup ! » Une fois dans la rue, elle marcha rapidement vers la gare; elle devait prendre le train pour se rendre au bureau. Cependant, à mi-chemin, elle réalisa qu'elle avait oublié un dossier important… Que faire ? Elle n’avait pas le temps de revenir en arrière ! Heureusement, son collègue, Mathieu, l’appela à ce moment précis. « Léa ! J’ai vu que tu avais laissé un dossier sur ton bureau hier soir; je l’ai pris avec moi, ne t’inquiète pas. » Ouf, quel soulagement ! « Merci, Mathieu, tu me sauves la vie ! » Il lui répondit avec un sourire dans la voix: « Pas de problème, c’est normal. » En arrivant à la gare, elle réalisa qu'elle avait encore quelques minutes avant le départ du train. Elle s’assit sur un banc et prit un moment pour respirer. « Tout va bien se passer », se rassura-t-elle. Le train arriva à l'heure, et elle monta à bord. Pendant le trajet, Léa relut ses notes: elle voulait être sûre de ne rien oublier. Il y avait tant de détails à présenter ! Ses idées devaient être claires, précises, et bien organisées. Une fois au bureau, tout s'enchaîna rapidement. Ses collègues étaient déjà là, prêts à commencer la réunion. « On y va ? », demanda son chef avec un sourire. Léa hocha la tête et prit une grande inspiration. C’était le moment ! Elle commença sa présentation avec assurance. « Mesdames et messieurs, je vous présente aujourd’hui notre nouveau projet: une application innovante qui simplifiera la gestion de nos clients. » Elle parla de chaque fonctionnalité, du design de l’application, et des avantages pour l’entreprise. Tout le monde écoutait attentivement. À la fin de son discours, elle lança: « Des questions ? » Il y eut un moment de silence… Puis, des applaudissements éclatèrent dans la salle ! « Bravo, Léa ! », s’exclama son chef. « C’était vraiment impressionnant. » Soulagée, elle sourit et répondit: «";
const shuffledParagraph = shuffleWords(paragraph);
console.log(shuffledParagraph);
