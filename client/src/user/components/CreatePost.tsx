import React, { useState } from 'react'
import { InputPicker, Modal, Button } from 'rsuite'
import { EditorWrapper } from '../../common/EditorWrapper';
import { Post, AnimalType } from '../../types'

interface Props {
  onSubmit: (post: Partial<Post>) => Promise<void>,
  open: boolean,
  onClose: () => void,
  animalTypes: AnimalType[]
}

export default function CreatePost(props: Props) {
  const [selectedAnimalTypeId, setSelectedAnimalTypeId] = useState(0);
  const [content, setContent] = useState('');
  return (
    <Modal
      open={props.open}
      size='lg'
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>Create post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputPicker
          className='fluid'
          placeholder='AnimalType'
          onChange={(val) => { setSelectedAnimalTypeId(Number(val)) }}
          data={props.animalTypes.map(e => {
            return {
              value: e.id,
              label: e.value
            }
          })}
        />
        <EditorWrapper content={content} setContent={setContent} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            await props.onSubmit({
              animalTypeId: selectedAnimalTypeId,
              content: content,
            })
            props.onClose();
          }}
          className='fluid' appearance='primary'>Post</Button>
      </Modal.Footer>
    </Modal>
  )
}
