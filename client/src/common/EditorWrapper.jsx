

import React from 'react'
import JoditEditor from 'jodit-react'
export function EditorWrapper({ content, setContent }) {

  return (
    <JoditEditor

      value={content}
      onBlur={setContent}

      config={{

        buttons: ['source', 'bold', 'italic', 'ul', 'ol', 'font', 'fontsize', 'brush', 'paragraph', 'image', 'table', 'link', 'left', 'center', 'right', 'justify', 'undo', 'redo', 'hr', 'eraser'],
        enableDragAndDropFileToEditor: true,
        uploader: {
          url: 'https://localhost:8000/upload',
          format: 'json',
          prepareData: function (data) {
            return data;
          },
          isSuccess: function (resp) {
            return resp;
          },
          process: function (resp) {
            console.log(resp)
            const obj = {
              files: resp.files,
              path: resp.fileUrl,
              baseurl: 'https://localhost:8000',
              error: resp.error,
              message: resp.message
            };
            console.log(obj);
            return obj
          },
          pathVariableName: 'path',
          filesVariableName: function (i) {
            return 'img';
          },
          defaultHandlerSuccess: function (data, resp) {
            console.log('success handler')
            console.log(data);
            if (data.path) {
              this.selection.insertImage(data.path);
            }
          },
        },

      }}

    />
  )
}