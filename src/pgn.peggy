{{
  function rootNode(comment) {
  	return comment !== null ? { comment, variations: [] } : { variations: []}
  }

  function node(move, suffix, nag, comment, variations) {
  	const node = { move, variations }

    if (suffix) {
    	node.suffix = suffix
    }

    if (nag) {
    	node.nag = nag
    }

    if (comment !== null) {
    	node.comment = comment
    }

    return node
  }

  function lineToTree(...nodes) {
  	const [root, ...rest] = nodes;

    let parent = root

    for (const child of rest) {
    	if (child !== null) {
        	parent.variations = [child, ...child.variations]
            child.variations = []
            parent = child
        }
    }

  	return root
  }

  function pgn(headers, game) {
  	if (game.marker && game.marker.comment) {
    	let node = game.root
        while (true) {
        	const next = node.variations[0]
            if (!next) {
            	node.comment = game.marker.comment
            	break
            }
            node = next
        }
    }

  	return {
    	headers,
        root: game.root,
        result: (game.marker && game.marker.result) ?? undefined
    }
  }
}}

pgn
    = headers:tagPairSection game:moveTextSection { return pgn(headers, game) }

tagPairSection
 	= tagPairs:tagPair* _ { return Object.fromEntries(tagPairs) }

tagPair "tag pair"
	= _ '[' _ tagName:tagName _ '"' tagValue:tagValue '"' _ ']' { return [tagName, tagValue] }

tagName "tag name"
	= $[a-zA-Z]+

tagValue "tag value"
	= $[^"]*

moveTextSection
	= root:line _ marker:gameTerminationMarker? _ { return { root, marker} }

line
	= comment:comment? moves:move* { return lineToTree(rootNode(comment), ...moves.flat()) }

move
	= _ moveNumber? _ san:san suffix:suffixAnnotation? nag:nag*  _ comment:comment? variations:variation* { return node(san, suffix, nag, comment, variations) }

moveNumber "move number"
    = [0-9]*'.' _ [.]*

san "standard algebraic notation"
	= $(("O-O-O" / "O-O" / "0-0-0" / "0-0" / [a-zA-Z][a-zA-Z1-8-=]+) [+#]?)

suffixAnnotation "suffix annotation"
	= [!?] |1..2|

nag "NAG"
	= _ '$' nag:$[0-9]+ { return nag }

comment
	= braceComment / restOfLineComment

braceComment "brace comment"
	= '{' comment:$[^}]* '}' { return comment.replace(/[\r\n]+/g, " ") }

restOfLineComment "rest of line comment"
	= ';' comment:$[^\r\n]* { return comment.trim() }

variation "variation"
    = _ '(' line:line _ ')' { return line }

gameTerminationMarker "game termination marker"
	= result:('1-0' / '0-1' / '1/2-1/2' / '*') _ comment:comment? { return { result, comment } }

_ "whitespace"
  = [\x20\t\r\n]*
