"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box, Plane, PerspectiveCamera, PointerLockControls, Text } from '@react-three/drei'
import { Vector3, Box3 } from 'three'

const LOBBY_WIDTH = 20
const LOBBY_LENGTH = 30
const ROOM_SIZE = 10
const WALL_THICKNESS = 0.2
const DOOR_WIDTH = 2
const WALL_COLOR = "#a0a0a0"
const DOOR_COLOR = "#8B4513"  // Brown color for wooden doors
const DOOR_PROXIMITY = 2.5

const Player = ({ setMessage }) => {
  const { camera } = useThree()
  const speed = 0.15
  const velocity = useRef(new Vector3())
  const keysPressed = useRef({})
  const [inRoom, setInRoom] = useState(false)
  const roomBounds = useRef(null)
  const nearDoor = useRef(false)
  const currentDoorRef = useRef(null)

  const checkCollision = (newPosition) => {
    const playerBounds = new Box3().setFromCenterAndSize(newPosition, new Vector3(1, 3.4, 1))
    
    if (inRoom) {
      return !roomBounds.current.containsPoint(newPosition)
    } else {
      return (
        newPosition.x < -LOBBY_WIDTH / 2 + WALL_THICKNESS + 0.5 ||
        newPosition.x > LOBBY_WIDTH / 2 - WALL_THICKNESS - 0.5 ||
        newPosition.z < -LOBBY_LENGTH / 2 + WALL_THICKNESS + 0.5 ||
        newPosition.z > LOBBY_LENGTH / 2 - WALL_THICKNESS - 0.5
      )
    }
  }

  const checkNearDoor = (position) => {
    const doorPositions = [
      new Vector3(-LOBBY_WIDTH / 3 + WALL_THICKNESS, 0, -10),
      new Vector3(-LOBBY_WIDTH / 3 + WALL_THICKNESS, 0, 0),
      new Vector3(-LOBBY_WIDTH / 3 + WALL_THICKNESS, 0, 10)
    ]

    for (let i = 0; i < doorPositions.length; i++) {
      if (position.distanceTo(doorPositions[i]) < DOOR_PROXIMITY) {
        nearDoor.current = true
        currentDoorRef.current = i
        return
      }
    }
    nearDoor.current = false
    currentDoorRef.current = null
  }

  useFrame((state, delta) => {
    velocity.current.set(0, 0, 0)

    if (keysPressed.current['w']) velocity.current.z -= 1
    if (keysPressed.current['s']) velocity.current.z += 1
    if (keysPressed.current['a']) velocity.current.x -= 1
    if (keysPressed.current['d']) velocity.current.x += 1

    velocity.current.normalize().multiplyScalar(speed)

    const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion)

    const newPosition = camera.position.clone()
    newPosition.addScaledVector(forward, -velocity.current.z * delta * 60)
    newPosition.addScaledVector(right, velocity.current.x * delta * 60)

    if (!checkCollision(newPosition)) {
      camera.position.copy(newPosition)
    }

    camera.position.y = 1.7

    if (!inRoom) checkNearDoor(camera.position)
    if (nearDoor.current && !inRoom) {
      setMessage("Press 'E' to enter the room")
    } else if (inRoom) {
      setMessage("Press 'E' to exit the room")
    } else {
      setMessage("")
    }
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key.toLowerCase()] = true
      if (event.key.toLowerCase() === 'e') {
        if (nearDoor.current && !inRoom) {
          setInRoom(true)
          const roomCenter = new Vector3(-LOBBY_WIDTH / 2 - ROOM_SIZE / 2, 0, (currentDoorRef.current - 1) * 10)
          camera.position.copy(roomCenter)
          camera.position.x += ROOM_SIZE / 2 - 1
          roomBounds.current = new Box3().setFromCenterAndSize(roomCenter, new Vector3(ROOM_SIZE - 1, 4, ROOM_SIZE - 1))
        } else if (inRoom) {
          setInRoom(false)
          camera.position.x = -LOBBY_WIDTH / 2 + 1
          camera.position.z = (currentDoorRef.current - 1) * 10
          roomBounds.current = null
        }
      }
    }
    const handleKeyUp = (event) => {
      keysPressed.current[event.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [camera, inRoom])

  return null
}

const Room = ({ position }) => {
  return (
    <group position={position}>
      {/* Back wall */}
      <Box args={[ROOM_SIZE, 4, WALL_THICKNESS]} position={[0, 2, -ROOM_SIZE/2]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      {/* Left wall */}
      <Box args={[WALL_THICKNESS, 4, ROOM_SIZE]} position={[-ROOM_SIZE/2, 2, 0]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      {/* Right wall */}
      <Box args={[WALL_THICKNESS, 4, ROOM_SIZE]} position={[ROOM_SIZE/2, 2, 0]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      {/* Front wall (with door) */}
      <Box args={[ROOM_SIZE, 4, WALL_THICKNESS]} position={[0, 2, ROOM_SIZE/2]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      {/* Door */}
      <Box args={[DOOR_WIDTH, 3, WALL_THICKNESS]} position={[0, 1.5, ROOM_SIZE/2]}>
        <meshStandardMaterial color={DOOR_COLOR} />
      </Box>
      {/* Floor */}
      <Plane args={[ROOM_SIZE, ROOM_SIZE]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#d4d4d4" />
      </Plane>
      {/* Ceiling */}
      <Plane args={[ROOM_SIZE, ROOM_SIZE]} rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Text position={[ROOM_SIZE/2 - 0.5, 2, 0]} rotation={[0, -Math.PI/2, 0]} fontSize={0.5}>
        Hospital Room
      </Text>
    </group>
  )
}

const Door = ({ position }) => {
  return (
    <Box args={[WALL_THICKNESS, 3, DOOR_WIDTH]} position={position}>
      <meshStandardMaterial color={DOOR_COLOR} />
    </Box>
  )
}

const HospitalWing = ({ setMessage }) => {
  return (
    <Canvas shadows style={{ height: '100vh' }}>
      <PerspectiveCamera makeDefault position={[0, 1.7, 0]} />
      <PointerLockControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 8, 0]} intensity={0.8} castShadow />

      {/* Floor */}
      <Plane 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        args={[LOBBY_WIDTH, LOBBY_LENGTH]}
      >
        <meshStandardMaterial color="#d4d4d4" />
      </Plane>

      {/* Ceiling */}
      <Plane 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 4, 0]} 
        args={[LOBBY_WIDTH, LOBBY_LENGTH]}
      >
        <meshStandardMaterial color="#ffffff" />
      </Plane>

      {/* Walls */}
      <Box args={[WALL_THICKNESS, 4, LOBBY_LENGTH]} position={[LOBBY_WIDTH/2, 2, 0]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      <Box args={[LOBBY_WIDTH, 4, WALL_THICKNESS]} position={[0, 2, -LOBBY_LENGTH/2]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      <Box args={[LOBBY_WIDTH, 4, WALL_THICKNESS]} position={[0, 2, LOBBY_LENGTH/2]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>
      {/* Left wall */}
      <Box args={[WALL_THICKNESS, 4, LOBBY_LENGTH]} position={[-LOBBY_WIDTH/2, 2, 0]}>
        <meshStandardMaterial color={WALL_COLOR} />
      </Box>

      {/* Doors */}
      <Door position={[-LOBBY_WIDTH/2 + WALL_THICKNESS/2, 1.5, -10]} />
      <Door position={[-LOBBY_WIDTH/2 + WALL_THICKNESS/2, 1.5, 0]} />
      <Door position={[-LOBBY_WIDTH/2 + WALL_THICKNESS/2, 1.5, 10]} />

      {/* Rooms */}
      <Room position={[-LOBBY_WIDTH/2 - ROOM_SIZE/2, 0, -10]} />
      <Room position={[-LOBBY_WIDTH/2 - ROOM_SIZE/2, 0, 0]} />
      <Room position={[-LOBBY_WIDTH/2 - ROOM_SIZE/2, 0, 10]} />

      <Player setMessage={setMessage} />
    </Canvas>
  )
}

export default function Component() {
  const [message, setMessage] = useState("")

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <HospitalWing setMessage={setMessage} />
      {message && (
        <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '8px', borderRadius: '4px' }}>
          {message}
        </div>
      )}
    </div>
  )
}
