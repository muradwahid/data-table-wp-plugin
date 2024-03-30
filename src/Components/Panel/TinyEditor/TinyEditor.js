/* eslint-disable no-unused-vars */
import { Editor } from '@tinymce/tinymce-react';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useRef, useState } from 'react';
import './tinyEditor.scss';
const TinyEditor = ({ value, onChange = () => {}, height = 180 }) => {
  const editorRef = useRef(null);
  const [media, setMedia] = useState('');
  const [content, setContent] = useState('');
  const [initialValue, setInitialValue] = useState(
    value || 'This is the initial content of the editor'
  );
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };
  useEffect(() => {
    const iframe = document?.querySelector('iframe');
    const iframeContent =
      iframe.contentDocument || iframe.contentWindow.document;
    const tinymce = iframeContent.querySelector('.mce-content-body');
    const createImgEl = document.createElement('img');
    createImgEl.src = media.url;
    createImgEl.style.maxWidth = '100%';
    createImgEl.style.maxHeight = '100%';
    tinymce?.appendChild(createImgEl);
  }, [media.url]);

  useEffect(() => {
    onChange(content);
  }, [content]);

  useEffect(() => {
    setContent(value);
  }, []);
  return (
    <div>
      <MediaUploadCheck>
        <MediaUpload
          gallery={true}
          onSelect={(value) => setMedia(value)}
          allowedTypes={['image/svg+xml']}
          render={({ open }) => (
            <button className="custom-tinymce-button" onClick={open}>
              <span className="dashicons dashicons-admin-media"></span>
              Add Media
            </button>
          )}
          multiple={false}
        />
      </MediaUploadCheck>
      <Editor
        apiKey="d1lxc40qcx6ad71i4bn1ih4d8l8oalalg9efymoc5l3ay9qo"
        onChange={(evt, editor) => setContent(editor.getContent())}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height,
          selector: 'textarea',
          menubar: false,
          plugins: ['lists link image charmap', 'fullscreen', 'media paste'],
          toolbar:
            'undo redo formatselect bold italic link alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat specilchar fullscreen',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ margin: '10px 0' }} variant="primary" onClick={log}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default TinyEditor;
