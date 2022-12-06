import { useEffect } from "react";


function useClickOutside(node, callback, ignoreNode = [], argsToListen) {

    useEffect(() => {
        function handleClickOutside(event) {
            if (ignoreNode.some(item => item && item.current && item.current.contains(event.target))) {
                return;
            }

            if (node.current && !node.current.contains(event.target)) {
                callback()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [node, argsToListen]);
}

export default useClickOutside;
