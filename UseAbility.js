on("chat:message", function(msg) {
    log(msg)
    if(msg.content.indexOf("!") === 0) 
    {
        var character = FindCharacterForPlayerID(msg.playerid);
        if (character)
        {
            log("Found character");
            FindSkill_1_AndUsePP(character.id);
            var Roll = FindSkill_1_Roll(character.id);
            if (Roll)
            {
                sendChat(msg.who, "Ability~!");
                sendChat(msg.who, "/roll " + Roll);
            }
        }
    }

});

function FindCharacterForPlayerID(playerid)
{
    log("Find character for playerid"+playerid)
    var characters = findObjs({_type: 'character'});
    //for (int i = 0; i < characters.Length; i++)
    for (var i in characters)
    {
        if (characters[i].get("controlledby") === playerid)
        {
            return characters[i];
        }
    }
}

function FindSkill_1_Roll(characterid)
{
    log("Finding roll for skill_1 for characterid"+characterid)
    var attributes = findObjs({
        type: 'attribute',
        characterid: characterid,
        name: "pokemon_skill_1_rolltype"
    });
    if (attributes.length === 1) {
        return attributes[0].get("current");
    }   
    else if (attributes.length > 1)
    {
        log("ERROR attribute array is bigger than 1");
    }
}

function FindSkill_1_AndUsePP(characterid)
{
    log("Finding currentPP for skill_1 for characterid"+characterid)
    var attributes = findObjs({
        type: 'attribute',
        characterid: characterid,
        name: "pokemon_skill_1_currentpp"
    });
    if (attributes.length === 1) {
        return UseCurrentPP(attributes[0]);
    }   
    else if (attributes.length > 1)
    {
        log("ERROR attribute array is bigger than 1");
    }
}

function UseCurrentPP(attribute)
{
    if (attribute.get('name') == "pokemon_skill_1_currentpp")
    {
        log("Using attribute");
        var currentvalue = attribute.get('current')
        attribute.set('current',currentvalue-1);
        
        return attribute;
    }
    else
    {
    }
}