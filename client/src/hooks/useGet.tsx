import axios from "axios";
import { useEffect, useState } from "react";


export default function useGet<T>(path: string, init: T | undefined = undefined) {
  const val = useState(init)

  useEffect(() => {
    axios.get(path).then(res => {
      val[1](res.data);
    })
  }, [path])

  return val
}