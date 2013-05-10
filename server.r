library(shiny)

shinyServer(function(input, output) {
  
  observe({
    if(input$slidify > 0) {
      print(input$editor_text)
    }
  })
  
})
