library(shiny)

shinyServer(function(input, output) {
  
  output$output <- renderText({
    if(input$slidify == 0) {
      return( 
        paste0(
          "<section class='slides'>",
          input$editor_text,
          "</section>"
        )  
      )
    }
    
    return( 
      isolate({
        paste0(
          "<section class='slides'>",
          input$editor_text,
          "</section>"
        )
      })
    )
  })
  
})
