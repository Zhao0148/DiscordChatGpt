export async function getConversation(message) {
    //Establish conversation history and assign message correspcoding to role
    const channels = ["1260674829133156392"];
  let conversation = [];
  
  //Set base role
  conversation.push({
    role: "system",
    content: "You are an assistant",
  });
  

  let prevMessages = await message.channel.messages.fetch({ limit: 10 });
  prevMessages.reverse();

  prevMessages.forEach((msg) => {
    //if the wrong bot is being used then return
    if (msg.author.bot && msg.author.id !== message.client.user.id) return;
    // msg.author.bot is a boolean.
    // msg.author.id checks the id of the author of the message.
    const username = msg.author.username
      .replace(/\s+/g, "_")
      .replace(/[^\w\s]/gi, "");

      //Set bot history
    if (msg.author.id === message.client.user.id) {
      conversation.push({
        role: "assistant",
        name: username,
        content: msg.content,
      });
      return;
    }
//Set user history
    conversation.push({
      role: "user",
      name: username,
      content: msg.content,
    });
  });

  return conversation;
}
