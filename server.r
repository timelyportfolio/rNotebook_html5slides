library(shiny)

shinyServer(function(input, output) {
  
  output$output <- renderText({
    if(input$slidify == 0) {
      return( 
        paste0(
          "<section class='slides'><article>",
          input$editor_text,
          "</article></section>"
        )  
      )
    }
    
    return(
      isolate({
        paste0(
          "<section class='slides'><article>",
          input$editor_text,
          "</article></section>"
        )
      })
    )
  })
  
})
